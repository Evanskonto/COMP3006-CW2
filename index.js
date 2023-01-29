const express = require("express");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");



dotenv.config();

//This will set the "strictQuery" option to true,
// which will suppress the warning and keep the current behavior.
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'views')))


app.listen(process.env.PORT || 3000, () => {
    console.log("Backend server is running!");
});