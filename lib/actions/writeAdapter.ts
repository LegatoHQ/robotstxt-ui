
import { RobotTxt__factory } from "../typechain-types";
import { getContractsFor } from "./contractOptions";


export async function setLicenseData(chainId:number,licenseUri:string,licenseInfo:string){
    const contracts = getContractsFor(chainId);
    const robots = await RobotTxt__factory.connect(contracts.ROBOTS_TXT, window.ethereum);

    
}