class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
		
		"/sum" (controller: sum){
			action = [GET: "list", POST: "create", DELETE: "deleteall"]
		}
		
		"/sum/$action?/$id" (controller: sum){
			action = [GET: "show", PUT: "update", DELETE: "delete"]
		}
	}
	
	
}
