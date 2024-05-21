import sgMail from "@sendgrid/mail"



sgMail.setApiKey(process.env.SEND_GRIDAPIKEY);

const sendWelcomeEmail = async (email, name) => {
    try {
        await sgMail.send({
            to: email,
            from: "omarkhalili810@gmail.com",
            subject: "Thanks you for joined in!",
            text: `Welcome to task app ${name}`
        });
        console.log("The email has been sent.");
    } catch (error) {
        console.log("An error occurred while sending the email:", error);
    }
}

const sendWhenUserRemoveAccount = async (email, name) => {
    try {
        await sgMail.send({
            to: email,
            from: "omarkhalili810@gmail.com",
            subject: "Good bye",
            text: `${name} Why you delete your account`
        })
        console.log("The email has been sent.")
    } catch (error) {
        console.log(error)
    }
}

// sgMail.send({
//     to: "awadamjad8@gmail.com",
//     from: "omarkhalili810@gmail.com",
//     subject: "sending hello",
//     text: "hello from Omar"
// }).then(() => {
//     console.log('Email sent')
// })
//     .catch((error) => {
//         console.error(error)
//     })

export {
    sendWelcomeEmail,
    sendWhenUserRemoveAccount
}