const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn , isOwner, validateListing} = require("../middleware.js"); 
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync( listingController.index ))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing , wrapAsync (listingController.createListing)
);

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync( listingController.showListing))
    .put(isLoggedIn,upload.single('listing[image]'), validateListing , wrapAsync( listingController.updateListing))     //update route
    .delete(isLoggedIn, wrapAsync( listingController.destroyListing)
);
 

//Edit route
router.get("/:id/edit" , isLoggedIn, wrapAsync( listingController.renderEditForm));


module.exports = router;