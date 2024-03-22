import {
    Box,
    Button,
    Container,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'
import {FaUserAlt} from "react-icons/fa";
import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
import {formatPhone} from "@root/utils/formatPhone.js";
import {LightenDarkenColor} from "@root/utils/lightenDarkenColor.js";
import {useState} from "react";

const ContactForm = ({heading, subHeader, imgSrc, buttonText, brandColor, removePadding}) => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    const [errors] = useState({});
    const [isSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const handlePhoneChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: formatPhone(value)});
    };

    // const validate = (values) => {
    //     let errors = {};
    //     if (!values.phoneNumber) {
    //         errors.phoneNumber = 'Required';
    //     }
    //     if (!values.email) {
    //         errors.email = 'Required';
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address';
    //     }
    //     return errors;
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setErrors(validate(formValues));
    //     setIsSubmitting(true);
    //
    //     const form = event.target;
    //     const data = new FormData(form);
    //
    //     fetch('/favicon.ico', {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //         body: new URLSearchParams(data).toString()
    //     })
    //         .then(() => {
    //             // Show success toast
    //             toast.success('Form Successfully Submitted!', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //             });
    //             setIsSubmitting(false);
    //             // Optionally reset form
    //             setFormValues({
    //                 name: '',
    //                 email: '',
    //                 phoneNumber: '',
    //                 message: '',
    //             });
    //         })
    //         .catch(() => {
    //             // Show error toast in case of fetch failure
    //             toast.error('Submission failed. Please try again.', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //             });
    //         });
    //
    // };

    // useEffect(() => {
    //     if (Object.keys(errors).length === 0 && isSubmitting) {
    //
    //
    //     }
    // }, [errors, formValues, isSubmitting]);

    return (
        <Box bg="bg.surface">
            <Container
                py={{
                    base: removePadding ? '4' : '16',
                    md: removePadding ? '0' : '24',
                }}
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
            >
                <Stack
                    spacing={{base: 8, md: 16}}
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}
                    justify={'space-between'}
                    align={{
                        base: 'start',
                        md: 'center',
                    }}
                >

                    <Box
                        width="full"
                        height={{
                            base: '100%',
                            md: 'md',
                        }}
                    >
                        <Image
                            boxSize="full"
                            alt={imgSrc?.title}
                            src={imgSrc?.url}
                            objectFit="cover"
                            loading='lazy'
                        />
                    </Box>
                    <Stack
                        spacing={{
                            base: '8',
                            md: '10',
                        }}
                        width="full"
                    >
                        <Box py="10" px={{base: 6, md: 12}}
                             bg="blackAlpha.50"
                             boxShadow="md" maxW={'430px'} mx={'auto'}>
                            <Box maxW={'350px'}
                                 mx={'auto'}>
                                <Stack spacing={2}>
                                    <Heading size={'lg'}>
                                        {heading}
                                    </Heading>
                                    <Text
                                        fontSize={{
                                            base: 'lg',
                                            md: 'xl',
                                        }}
                                        mb={5}
                                        color="fg.muted"
                                    >
                                        {subHeader}
                                    </Text>
                                </Stack>
                                <Stack
                                    width="full"
                                    fontWeight={'normal'}
                                >

                                    <form action="/?index" id="contactForm" data-netlify="true"
                                          name="contactForm"
                                          method="POST">
                                        <input type="hidden" name="form-name" value="contactForm"/>
                                        <Stack spacing={'3'} minW={'full'}>
                                            {/* Name Input */}
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none' pt={4}><FaUserAlt
                                                    style={{color: "#cbd5e0"}}/></InputLeftElement>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Full Name"
                                                    required
                                                    onChange={handleChange}
                                                    value={formValues.name}
                                                    borderRadius={0}
                                                    minH={14}
                                                    bg={'white'}
                                                    borderColor={'gray.200'}
                                                />
                                            </InputGroup>
                                            {errors.name && <div className="text-danger">{errors.name}</div>}

                                            {/* Email Input */}
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none' pt={4}><EmailIcon
                                                    color="gray.300"/></InputLeftElement>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    required
                                                    onChange={handleChange}
                                                    value={formValues.email}
                                                    borderRadius={0}
                                                    minH={14}
                                                    bg={'white'}
                                                    borderColor={'gray.200'}
                                                />
                                            </InputGroup>
                                            {errors.email && <div className="text-danger">{errors.email}</div>}

                                            {/* Phone Number Input */}
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none' pt={4}><PhoneIcon
                                                    color="gray.300"/></InputLeftElement>
                                                <Input
                                                    type="text"
                                                    name="phoneNumber"
                                                    placeholder="Phone Number"
                                                    onChange={handlePhoneChange}
                                                    value={formValues.phoneNumber}
                                                    borderRadius={0}
                                                    minH={14}
                                                    bg={'white'}
                                                    borderColor={'gray.200'}
                                                />
                                            </InputGroup>
                                            {errors.phoneNumber &&
                                                <div className="text-danger">{errors.phoneNumber}</div>}

                                            {/* Message Textarea */}
                                            <Textarea
                                                name="message"
                                                placeholder="Question / Message?"
                                                onChange={handleChange}
                                                value={formValues.message}
                                                borderRadius={0}
                                                pt={2}
                                                bg={'white'}
                                                borderColor={'gray.200'}
                                            />

                                            {Object.keys(errors).length > 0 && (
                                                <div className="global-error-message text-danger">
                                                    Please correct the errors before submitting.
                                                </div>
                                            )}

                                            {/* Submit Button */}
                                            <Button type="submit" style={{color: "#fff"}} bg={brandColor?.value}
                                                    _hover={{
                                                        bg: `#${LightenDarkenColor(brandColor?.value.replace("#", ''), 40)}`
                                                    }}
                                                    disabled={isSubmitting} size={'lg'} minW={'200px'} borderRadius={0}
                                                    minH={14}>
                                                {buttonText} <i className="fa-solid fa-angles-right"/>
                                            </Button>
                                        </Stack>
                                    </form>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default ContactForm