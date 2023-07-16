

const validations = (form,db) =>{

    const errors = {};
    const namesDb = db.map(el=>el.name);

    if (form.name.length > 30){
        errors.name = "The Name cannot be too long, maximum 30 characters";
    };

    if(namesDb.includes(form.name)){
        errors.name = "That Name already exists in your DataBase";
    };

    if (form.platforms.length > 50){
        errors.platforms = "platform must be less than 50 characters";
    };

    if(!/^[a-zA-Z0-9\s]+$/.test(form.platforms)){
        errors.platforms = "The use of any symbol is not allowed, only alphabetic characters";
    };

    if (!/\b((https?|ftp):\/\/)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+(?:\.jpg|\.jpeg|\.png|\.svg|\.gif)\b/.test(form.background_image)) {
        errors.background_image = "It is not a correct URL, try another one ( make sure it is a .jpg, .jpeg, .png, .gif )";
    };
 
    if (!/^(19[58-9]\d|20[0-4]\d|2050)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(form.released)) {
        errors.released = "The first video game was released in 1958 called 'Tennis for Two'. Year must be greater than this";
    };

    if (form.description.split(" ").length < 5){
        errors.description = "The description must have at least 5 words";
    };
    
    if (form.rating < 0 || form.rating > 5 || !/^\d+(\.\d{1,2})?$/.test(form.rating)) {
    errors.rating = "Enter a valid number between 0 and 5 with up to 2 decimal places";
    };

    return errors
}

export default validations;

