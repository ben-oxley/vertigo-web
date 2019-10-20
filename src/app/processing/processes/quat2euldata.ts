import { AbstractDataBlock } from './abstractdatablock';
import { Data } from '../data';

export class Quat2EulData extends AbstractDataBlock {

    private quaternion: Array<number> = [1, 0, 0, 0];

    public constructor(headers: string[]) {
        super();
        this.headers = [
            'North Acceleration',
            'East Acceleration',
            'Down Acceleration',
            'North Angular Velocity',
            'East Angular Velocity',
            'Down Angular Velocity',
        ];
    }

    private add(data: Data): Data {
        const accelInBoardFrame: Array<number> = data.Data.slice(2, 5);
        const angularVelocityInBoardFrame: Array<number> = data.Data.slice(5, 8);
        const accelInWorldFrame = this.convertToWorldReference(accelInBoardFrame, this.quaternion);
        const angularVelocityInWorldFrame = this.convertToWorldReference(angularVelocityInBoardFrame, this.quaternion);
        const resolvedData: Data = new Data([
            data.Data[0],
            data.Data[1],
            accelInWorldFrame[0],
            accelInWorldFrame[1],
            accelInWorldFrame[2],
            angularVelocityInWorldFrame[0],
            angularVelocityInWorldFrame[1],
            angularVelocityInWorldFrame[2]
        ]);
        this.data.push(resolvedData);
        return resolvedData;
    }

    public SetQuaternion(data: Data) {
        this.quaternion = data.Data.slice(2, 6);
    }


    public Load(data: Data) {
        const eulerData: Data = this.add(data);
        this.notifyListeners([eulerData], []);
    }

    public LoadAll(data: Data[]) {
        const eulerDataArray: Data[] = [];
        data.forEach(d => {
            const eulerData: Data = this.add(d);
            eulerDataArray.push(eulerData);
        });
        this.notifyListeners(eulerDataArray, []);
    }
    private convertToWorldReference(vector: Array<number>, quaternion: Array<number>): Array<number> {
        const correctedVector: Array<number> = this.toWorldReference(vector, quaternion);
        const output: Array<number> = [];
        output.push(correctedVector[0]);
        output.push(correctedVector[1]);
        output.push(correctedVector[2]);
        return output;
    }

    private toWorldReference(vector: Array<number>, quaternion: Array<number>): Array<number> {
        let outputVector: Array<number> = [0.0, vector[0], vector[1], vector[2]];
        outputVector = this.hamiltonian(quaternion, outputVector);
        outputVector = this.hamiltonian(outputVector, this.quaternionConjugate(quaternion));
        outputVector = [outputVector[1], outputVector[2], outputVector[3]];
        return outputVector;
    }

    private quaternionConjugate(q: Array<number>): Array<number> {
        const output: Array<number> = [];
        output.push(q[0]);
        output.push(-q[1]);
        output.push(-q[2]);
        output.push(-q[3]);
        return output;
    }

    private hamiltonian(q: Array<number>, r: Array<number>): Array<number> {
        const output: Array<number> = [];
        output.push(q[0] * r[0] - q[1] * r[1] - q[2] * r[2] - q[3] * r[3]);
        output.push(q[0] * r[1] + r[0] * q[1] + q[2] * r[3] - q[3] * r[2]);
        output.push(q[0] * r[2] + r[0] * q[2] + q[3] * r[1] - q[1] * r[3]);
        output.push(q[0] * r[3] + r[0] * q[3] + q[1] * r[2] - q[2] * r[1]);
        return output;
    }

    private toEuler(q: Array<number>): Array<number> {
        const t0 = -2 * (q[2] * q[2] + q[3] * q[3]) + 1;
        const t1 = 2 * (q[1] * q[2] - q[0] * q[3]);
        let t2 = -2 * (q[1] * q[3] + q[0] * q[2]);
        const t3 = 2 * (q[2] * q[3] - q[0] * q[1]);
        const t4 = -2 * (q[1] * q[1] + q[2] * q[2]) + 1;
        if (t2 > 1) {
            t2 = 1;
        }

        if (t2 < -1) {
            t2 = -1;
        }

        let pitch = Math.asin(t2) * 2;
        let roll = Math.atan2(t3, t4);
        let yaw = Math.atan2(t1, t0);
        pitch = pitch * (180.0 / Math.PI);
        roll = roll * (180.0 / Math.PI);
        yaw = yaw * (180.0 / Math.PI);
        return [pitch, roll, yaw];
    }

}
