AirBnb Store Shape:

store: {
    Session: {},

    Spots:{
        allSpots: { // return an array of all the spot names by id
            spotId: {spotData}   // can access each spot's data through its spot Id

        }

        spot: { // return all details of a spot
            Owner: {
                OwnerId,
                OwnerInfo
            }
            spotData,
            spotImages: [spotimages]
        }
}

    Reviews: { // need to redo
        spot: {
            spotId,
             review: {
                 spotId: {reviewData}
        }
        }
        User: {
            userId: {userData}
        },
        },
        ReviewImages: [reviewImagesData]
    }

}
