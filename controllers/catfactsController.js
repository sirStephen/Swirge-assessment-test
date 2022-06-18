import db from '../models/index.js'
import functions from '../routes/handlers/catFactsHandler.js';
import { errorResponse, successResponse } from "../helper/responsehandler.js"

const Catfact = db.catfacts;

// add cat facts to database
const addCatFacts = async (request, response) => {
    try {
        // call public api
		const results = await functions.getListFromAPI();

        // loop through data from public api and resolve data
        const data = await Promise.all(results.map(async (result) => {
            let info = {
                id: result._id,
                user: result.user,
                text: result.text,
                source: result.source,
                updatedAt: result.updatedAt,
                type: result.type,
                createdAt: result.createdAt,
                deleted: result.deleted,
                used: result.used
            }

            const catfact = await Catfact.create(info)
            return catfact;
        }));
        return successResponse(response, data, 201, true);
	} catch (error) {
        return errorResponse(response, error, 500, false)
		// next(err);
	}
}

// get all cat facts
const getAllCatfacts = async (request, response) => {
    try {
        let catfacts = await Catfact.findAll()

        // fetch data if catfacts is greater than 0
        if (catfacts.length > 0) {
            return successResponse(response, catfacts, 200, true);
        }

        // checks if catfacts is less than or equal to 0
        if (catfacts.length <= 0) {
            return successResponse(response, "Empty!!! no cat facts found", 404, true);
        }
    } catch (err) {
        return errorResponse(response, err, 500, false)
    }    
}

// get one cat fact
const getOneCatfacts = async (request, response) => {
    try {
        let { id } = request.params;

        let catfact = await Catfact.findOne({ where: { id: id }})
        
        // checks if id exist
        if (catfact) {
            return successResponse(response, catfact, 200, true);
        }

        // checks if id does not exist
        if (!catfact) {
            return successResponse(response, `cat fact with id ${id} is invalid`, 404, true);
        }
    } catch (error) {
        return errorResponse(response, error, 500, false)
    }    
}

// update cat fact
const updateCatfact = async (request, response) => {
    try {
        let { id } = request.params;

        let catfact = await Catfact.update(request.body, { where: { id: id }})

         // checks if id exist
        if (catfact[0]) {
            // fetch update data
            let getupdatecatfact = await Catfact.findOne({ where: { id: id }})

            return successResponse(response, getupdatecatfact, 200, true);
        }

        // checks if id does not exist
        if (!catfact[0]) {
            return successResponse(response, `cat fact with id ${id} is invalid`, 404, true);
        }
    } catch (error) {
        return errorResponse(response, error, 500, false)
    }
}

// delete cat fact
const deleteCatfact = async (request, response) => {
    try {
        let { id } = request.params;

        let catfact = await Catfact.destroy({ where: { id: id }})

        // checks if id exist
        if (catfact) {
            return successResponse(response, `cat fact with id ${id} was deleted successfully`, 200, true);
        }

        // checks if id does not exist
        if (!catfact) {
            return successResponse(response, `cat fact with id ${id} is invalid`, 404, true);
        }
    } catch (error) {
        return errorResponse(response, error, 500, false)
    }
}

export default {
    addCatFacts,
    getAllCatfacts,
    getOneCatfacts,
    updateCatfact,
    deleteCatfact
}

