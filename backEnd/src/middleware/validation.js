



const dataMethods = ["body" , "params" , "query" , "headers"]





export const validation = (schema) => {
    return (req , res , next) => {

        let validationErr = []
        dataMethods.forEach((key)=> {
            if(schema[key]) {
                const validationResult = schema[key].validate(req[key] , {abortEary : false})
                if(validationResult?.error?.details) {
                    validationErr.push(validationResult.error.details)
                }
            }
        })

        if(validationErr.length) {
            let newvalidationErr = validationErr[0][0]
            return res.status(400).json({message : "validation error" , err : validationErr[0]})
            res.json({message : newvalidationErr, err : validationErr[0]})
        }else {
            next()
        }
    }
}


// export const validation = (schema) => {
//     return (req , res , next) => {

//         let validationErr = []
//         dataMethods.forEach((key)=> {
//             if(schema[key]) {
//                 const validationResult = schema[key].validate(req[key] , {abortEary : false})
//                 if(validationResult?.error?.details) {
//                     validationErr.push(validationResult.error.details)
//                 }
//             }
//         })

//         if(validationErr.length) {
//             let newvalidationErr = validationErr[0][0]
//             if(newvalidationErr.type == "string.pattern.base") {
//                const arry =  newvalidationErr.message.split(", ")
//                newvalidationErr.message = arry
//             }
//             return res.status(400).json({message : "validation error"  ,  newvalidationErr })
//         } 
//         next()
//     }
// }








