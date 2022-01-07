import forge from '../node_modules/node-forge'

function encryptData(data)
{
    const { input, password, saltInput } = data;
    //const forge = require('node-forge');

    //const salt = forge.random.getBytesSync(16);


    var md = forge.md.sha256.create();
        md.update(saltInput)
       
    
    const salt = md.digest().getBytes(16)

    //const salt = 

    const iv = forge.random.getBytesSync(16);

    const key = forge.pkcs5.pbkdf2(password, salt, 100000, 256/8, forge.md.sha256.create());
    //const key = forge.pkcs5.pbkdf2(password, salt, 100000, 256/8, 'SHA256');

    const cipher = forge.cipher.createCipher('AES-CBC', key);

    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(input));
    cipher.finish();

    const encrypted = cipher.output.bytes();

    return forge.util.encode64(salt + iv + encrypted)    
}




function decryptData(data)
{
    const { password, encryptedHash } = data;
    // const forge = require('node-forge');
    const encrypted = forge.util.binary.base64.decode(encryptedHash);

    const salt_len = 16;
    const iv_len = 16;

    const salt = forge.util.createBuffer(encrypted.slice(0, salt_len));
    const iv = forge.util.createBuffer(encrypted.slice(0+salt_len, salt_len+iv_len));

    //const key = forge.pkcs5.pbkdf2(password, salt.bytes(), 100000, 256/8, 'SHA256');
    const key = forge.pkcs5.pbkdf2(password, salt.bytes(), 100000, 256/8, forge.md.sha256.create());
    const decipher = forge.cipher.createDecipher('AES-CBC', key);

    decipher.start({iv: iv});
    decipher.update(
    forge.util.createBuffer(encrypted.slice(salt_len + iv_len))
    );
    decipher.finish();

    return decipher.output.toString();    

}


export function utf8E(string){
    return forge.util.encodeUtf8(string);
}

export function utf8D(utf8encoded){
    return forge.util.decodeUtf8(utf8encoded);;
}

export function SHA256(data){
    var md = forge.md.sha256.create();
    md.update(data);
    return md.digest().toHex();
}





export function encrypt(data){
    return encryptData(data)
}



export function decrypt(data){
    return decryptData(data)
}

