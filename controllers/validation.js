const {Validator, ValidationError} = require('jsonschema');
const listingsSchema = require('../schemas/listing.json').definitions.listing;
const usersSchema = require('../schemas/user.json').definitions.user;

const v = new Validator();


exports.validateListing = async (ctx, next) => {
    
    const validationOptions = {
        throwError: true,    
        allowUnknownAttributes: false        
    };

    const body = ctx.request.body;
    try {
        v.validate(body, listingsSchema, validationOptions);
        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }    
    }
}

exports.validateUser = async (ctx, next) => {
    
  const validationOptions = {
      throwError: true,    
      allowUnknownAttributes: false        
  };

  const body = ctx.request.body;
  try {
      v.validate(body, usersSchema, validationOptions);
      await next();
  } catch (error) {
      if (error instanceof ValidationError) {
          ctx.body = error;
          ctx.status = 400;
      } else {
          throw error;
      }    
  }
}