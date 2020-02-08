import pify from 'pify';
import kerberos from 'kerberos';


export default pify((token, cb) => {
    kerberos.initializeServer("", function(err, server) {
        if(err) {
            cb(new Error("Error occured while initializing kerberos"));
        }
        server.step(token, function (err) {
            if(err || ! server.contextComplete) {
                cb(new Error("Error occured while authenticating with kerberos "));
            }

            const username = server.username;
            cb(null, username);
        });
    });

});