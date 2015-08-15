package goodcalc

import grails.converters.JSON

class SumController {
    //static scaffold = true
	
	def create = {
		def json = request.JSON
		def sum = new Sum()
		sum.fullSum = json.fullSum
		
		if(sum.validate()){
			sum.save();
			response.status = 201
			render sum as JSON
		}
		else{
			sendValidationFailedResponse(sum, 403)
		}
	}
	
	private def sendValidationFailedResponse(sum, status){
		response.status = status
		render contentType: "application/JSON", {
			errors {
				sum?.errors?.fieldErrors?.each { err ->Field(err.field)
					message(g.message(error: err))
				}
			}
		}
	}
	
	def list = {
		render Sum.list() as JSON
	}
	
	def show = {
		Sum sum = Sum.get(params.id)
		if(sum){
			render sum as JSON
		}
		else{
			SendNotFoundResponse()
		}
	}
	
	def SendNotFoundResponse() {
		response.status = 404
		render contentType: "application/JSON", {
			errors {
				message("Sum not found with id: + params.id")
			}
		}
	}
	
	def deleteall = {
		Sum.executeUpdate('delete from Sum')
		response.status = 204
		render ""
	}
	
	def delete = {
		Sum.executeUpdate('delete from Sum where id = ?', [Long.valueOf(params.id)])
		response.status = 204
		render ""
	}
}

