<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions allow for data to be retained when the user returns to our application. Specifically, we can retain information so that the user doesn't have to keep re-entering their information.

2. What does bcrypt do to help us store passwords in a secure manner.

Bcrypt allows us to hash our passwords to securely store them within our DB.

3. What does bcrypt do to slow down attackers?

Bcrypt allows us to hash the password more than once, which can slow down attacks.

4. What are the three parts of the JSON Web Token?

Header - contains alg + type
Payload - contains the data that we want transferred/received
Signature - contains a signature that can be verified via secret key
