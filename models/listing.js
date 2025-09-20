const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
    //    type: String,
    //    default: "https://cdn.wallpapersafari.com/74/69/C9QEUs.jpg",
    //    set: (v) =>
    //      v === ""
    //     ? "https://cdn.wallpapersafari.com/74/69/C9QEUs.jpg" : v,

    filename: String,
    url: String,
    },
    price: Number,
    location: String,
    country: String,
   geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number], // [lng, lat]
            default: null // fallback Delhi
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review", 
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

//this is an mongoose middleware helps to delete the reviews if we delete the whole isting from db
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
