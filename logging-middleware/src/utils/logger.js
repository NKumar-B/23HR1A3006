import {sendLog}

from "../services/logService";

import {validateLog}

from "./validator";

export async function Log(

stack,

level,

packageName,

message

){

try{

validateLog(

stack,

level,

packageName,

message

);

await sendLog({

stack,

level,

package:packageName,

message

});

}

catch(error){

// Never use console.log

}

}