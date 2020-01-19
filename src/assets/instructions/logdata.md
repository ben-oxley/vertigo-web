#### CSV Description

CSV log files are created on the SD card in the name format vtg_logX.csv, where
X is an incrementing number. If you clear the files on the SD card, this number
will reset to 0.

The CSV files contain log lines. The first column is a timestamp in
milliseconds since Vertigo booted. The second column is the type of the
message, which are described below.

#### 1. GPS

Columns 3, 4, and 5 are longitude (decimal degrees), latitude (decimal degrees)
and altitude (metres) respective.

**Example**  
Message: `24508,1,-0.1435435,51.34556,123.24`  
Time: 24508 ms  
Message type: 1 (GPS)  
Longitude: -0.1435435 degrees  
Latitude: 51.34556 degrees  
Altitude: 123.243 metres  

#### 2. IMU (inertial measurement unit)

The fields are accelerations in x, y, z (in units of g) and gyroscope rates
around x, y, z (in deg/s).

**Example**  
Message: `24513,2,-0.018066,0.150879,1.030273,-0.792683,-0.670732,0.060976`  
Time: 24513 ms  
Message Type: 2 (IMU)  
Acceleration (x): -0.018066 g  
Acceleration (y): 0.150879 g  
Acceleration (z): 1.030273 g  
Gyroscope (x): -0.792683 deg/s  
Gyroscope (y): -0.670732 deg/s  
Gyroscope (z): 0.060976 deg/s  

#### 3. AHRS (altitude and heading reference system)

Produced by the AHRS (altitude and heading reference system). The data is a
quaternion in the format w, x, y, z, where w is the scalar rotational quantity
and x, y and z represents a unit length vector of the quaternion that
transforms the the board frame into the world (north-east-down - NED) frame.

**Example**  
Message: `24513,3,0.951578,0.057938,0.023379,0.300992`  
Time: 24513 ms  
Message Type: 3 (AHRS)  
w: 0.951578  
x: 0.057938  
y: 0.023379  
z: 0.300992  
