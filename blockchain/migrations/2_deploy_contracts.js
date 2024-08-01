const Certificate = artifacts.require("Certificate");

module.exports = function (deployer) {
    deployer.deploy(Certificate);
};
