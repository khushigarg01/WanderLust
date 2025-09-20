const Listing = require("../models/listing");
const axios = require("axios");

// ================== INDEX ==================
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// ================== NEW FORM ==================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// ================== SHOW ==================
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { 
        listing,
        maptilerKey: process.env.MAPTILER_API_KEY
    });
};

// ================== CREATE ==================
module.exports.createListing = async (req, res) => {
    try {
        console.log("Requesting geocode for:", req.body.listing.location);
const geoResp = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}&limit=1`,
    {
        headers: {
            'User-Agent': 'WanderLust-App'
        }
    }
);

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        // ✅ Assign geometry directly on the Mongoose object
        if (geoResp.data.length) {
    console.log("Geocoding result:", geoResp.data[0]);
    const lat = parseFloat(geoResp.data[0].lat);
    const lng = parseFloat(geoResp.data[0].lon);
    newListing.geometry = { type: "Point", coordinates: [lng, lat] };
}else {
            req.flash("error", "Location not found. Please try again.");
            return res.redirect("/listings/new");
        }

        // ✅ Image handling
        if (req.file) {
            newListing.image = { url: req.file.path, filename: req.file.filename };
        } else {
            newListing.image = {
                url: "https://cdn.wallpapersafari.com/74/69/C9QEUs.jpg",
                filename: "default.jpg"
            };
        }

        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("Geocoding API failed:", err.message);
        req.flash("error", "Failed to create listing. Please try again.");
        res.redirect("/listings/new");
    }
};

// ================== EDIT FORM ==================
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/uploads", "/uploads/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// ================== UPDATE ==================
module.exports.updateListing = async (req, res) => {
    try {
        console.log("Requesting geocode for update:", req.body.listing.location);

       const geoResp = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}&limit=1`,
    {
        headers: {
            'User-Agent': 'WanderLust-App'
        }
    }
);

        const { id } = req.params;
        let listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        // ✅ Update fields from form
        listing.set(req.body.listing);

        // ✅ Update geometry if geocode worked
       if (geoResp.data.length) {
    console.log("Geocoding result:", geoResp.data[0]);
    const lat = parseFloat(geoResp.data[0].lat);
    const lng = parseFloat(geoResp.data[0].lon);
    newListing.geometry = { type: "Point", coordinates: [lng, lat] };
} else {
            req.flash("error", "Location not found. Please try again.");
            return res.redirect(`/listings/${id}/edit`);
        }

        // ✅ Image handling
        if (req.file) {
            listing.image = { url: req.file.path, filename: req.file.filename };
        }

        await listing.save();

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Geocoding API failed:", err.message);
        req.flash("error", "Failed to update listing. Please try again.");
        res.redirect(`/listings/${req.params.id}/edit`);
    }
};

// ================== DELETE ==================
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted:", deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
