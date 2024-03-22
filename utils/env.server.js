import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';

/**
 * Load `.env` files located in the root directory. The contents of the `.env`
 * files are applied to `process.env`.
 * @returns the list of `.env` files processed.
 */
export function loadEnvConfig() {
    // Check if `.env` files have already been processed
    if (process.env.__SERVER_PROCESSED_ENV) {
        return [];
    }
    // Mark that the environment values have been processed
    process.env.__SERVER_PROCESSED_ENV = 'true';

    // Define the root directory path
    const rootDir = process.cwd();

    // Load `.env` file
    const loadedEnvFiles = [];
    const dotEnvFiles = ['.env'];
    for (const envFile of dotEnvFiles) {
        // Construct the path to the `.env` file in the root directory
        const dotEnvPath = path.join(rootDir, envFile);
        try {
            const stats = fs.statSync(dotEnvPath);
            if (!stats.isFile()) {
                continue;
            }
            // Read the contents of the `.env` file
            const contents = fs.readFileSync(dotEnvPath, 'utf8');
            loadedEnvFiles.push({ path: dotEnvPath, contents });
        } catch (err) {
            // Handle errors if the `.env` file does not exist
            if (err.code !== 'ENOENT') {
                console.error(`Failed to load env from ${envFile}`, err);
            }
        }
    }
    // Process the loaded `.env` files and update `process.env`
    processEnv(loadedEnvFiles);
    return loadedEnvFiles;
}

/**
 * Process the given `EnvFile` record contents and apply it to the `process.env`
 * @param loadedEnvFiles to be processed
 */
function processEnv(loadedEnvFiles) {
    const origEnv = Object.assign({}, process.env);
    const parsed = {};
    for (const envFile of loadedEnvFiles) {
        try {
            let result = {};
            result.parsed = parse(envFile.contents);
            result = expand(result);
            if (result.parsed) {
                console.info(`Loaded env from ${envFile.path}`);
            }
            for (const key of Object.keys(result.parsed || {})) {
                const v = result.parsed?.[key];
                if (
                    typeof parsed[key] === 'undefined' &&
                    typeof origEnv[key] === 'undefined' &&
                    typeof v !== 'undefined'
                ) {
                    parsed[key] = v;
                }
            }
        } catch (err) {
            console.error(`Failed to load env from ${envFile.path}`, err);
        }
    }
    return Object.assign(process.env, parsed);
}
