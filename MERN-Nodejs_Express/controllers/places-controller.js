const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator")

const HttpError = require("../models/http-error")
const getCoordsForAddress = require("../utils/location");

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Bulding',
        description: 'HIHI HI HA',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'hihihas',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if(!place) { 
        throw new HttpError('Couldn\'t find a place for the provided pid', 404)
    }
    res.json({place})
    
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const userPlaces = DUMMY_PLACES.filter(p => {
        return p.creator === userId
    })

    if(!userPlaces || userPlaces.length === 0) {
        return next(new HttpError('Couldn\'t find a place for the provided pid', 404))
    }
    res.json({userPlaces})
}

const createdPlace  = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        next(new HttpError("Invalid inputs passed, please check your data.", 422))
    }

    const { title, description, address, creator } = req.body;

    let coordinates;

    try {
        coordinates = getCoordsForAddress(address)
    } catch(error) {
        return next(error)
    }

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address, 
        creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }

    const { title, description} = req.body;
    const placeId = req.params.pid

    const updatePlace = {...DUMMY_PLACES.find(p => p.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatePlace.title = title;
    updatePlace.description = description

    DUMMY_PLACES[placeId] = updatePlace
    res.status(200).json({place: updatePlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    if(!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError("Could not find a place for that id", 404)
    }   
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: "Deleted place!"})
}

exports.getPlacesByUserId = getPlacesByUserId
exports.getPlaceById = getPlaceById
exports.createdPlace = createdPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace