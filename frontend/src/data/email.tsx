import emailjs from "emailjs-com";
export function sendEmail(to_name, message) {
  var templateParams = {
    to_email: "testbeta442@gmail.com",
    to_name: to_name,
    message: message,
  };
  emailjs
    .send(
      "service_iwbj3qf",
      "template_clfu2qq",
      templateParams,
      "user_OmceiOldqPYmh6SrleowV"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}
