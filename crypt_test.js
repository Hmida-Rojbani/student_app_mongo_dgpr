const bcrypt=require('bcrypt');

//1234-->abcd

async function run(){
    const salt=await bcrypt.genSalt(10);
        console.log(salt);

        const hash=await bcrypt.hash('1234',salt);
        console.log(hash)
        const test =await bcrypt.compare('1234',hash);
        console.log(test)
}
run()