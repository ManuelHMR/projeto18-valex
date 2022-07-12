import bcrypt from "bcrypt";

export async function checkPassword(password:string, passwordHash: string) {
    if(!bcrypt.compareSync(password, passwordHash)) {
        throw{
            status: 400,
            type:"wrongPassword",
            message:"Wrong password!"
        }
    };
};