import {

STACKS,

LEVELS,

PACKAGES

}

from "../config/constants";

export function validateLog(

stack,

level,

packageName,

message

){

if(!STACKS.includes(stack))

throw new Error(

"Invalid Stack"

);

if(!LEVELS.includes(level))

throw new Error(

"Invalid Level"

);

if(!PACKAGES.includes(packageName))

throw new Error(

"Invalid Package"

);

if(

!message ||

message.trim()===""

)

throw new Error(

"Message Required"

);

}