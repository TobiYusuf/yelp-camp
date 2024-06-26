const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const cities = require("./cities");

mongoose
  .connect("mongodb://0.0.0.0:27017/yelp-camp")
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR !!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeddB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://source.unsplash.com/collection/483251`,
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero possimus recusandae exercitationem fugit consectetur sunt eveniet, eligendi ipsam, voluptate laboriosam repellendus. Quisquam neque ipsum voluptas. Aut molestiae amet labore doloremque!`,
      price,
    });
    await camp.save();
  }
};

seeddB().then(() => {
  mongoose.connection.close();
});
