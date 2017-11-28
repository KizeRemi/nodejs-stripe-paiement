const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);
var port = process.env.PORT || 8080;

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", (req, res) =>
res.render("index.pug", {keyPublishable}));

app.post("/charge", (req, res) => {
        let amount = req.body.paiementValue;
        console.log(amount);
        stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
        })
        .then(customer =>
            stripe.charges.create({
            amount,
            description: "Sample Charge",
                currency: "usd",
                customer: customer.id
        }))
        .then(charge => 
            res.render("index.pug"));
        });

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});