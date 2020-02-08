import pify from 'pify';
import kerberos from 'kerberos';


export default pify((token, cb) => {
    kerberos.initializeServer("", function(err, server) {
        if(err) {
            cb(new Error("Error occured while initializing kerberos"));
        }
        server.step(token, function (err, serverResponse) {
            if(err || ! server.contextComplete) {
                cb(new Error("Error occured while authenticating with kerberos "));
            }

            cb(null, {"username": server.username,
                     "principle": server.targetName,
                     "serverResponse": serverResponse});
        });
    });

});