#### Log File Description

Log files are created on the SD card in CSV format. The names of the files will depend on whether Vertigo had GPS lock (and therefore knowledge of the current time/date) when the log file was created. Without GPS lock, the name format will be vtg_logX.csv, where X is an incrementing number. If you clear the files on the SD card, this number will reset to 0.

The CSV files contain log lines. The first column is a timestamp in the following format:
`YYYY-MM-dd HH:mm:ss.fff`, where:
* `YYYY` - 4 digit year (e.g., 2020)
* `MM` - 2 digit month (e.g., 01)
* `dd` - 2 digit date (e.g., 01)
* `HH` - 24-hour hour of day (e.g., 16)
* `mm` - 2 digit minute of hour (e.g., 34)
* `ss` - 2 digit second of minute (e.g., 22)
* `fff` - 3 digit fractional second (e.g., 002)

After the timestamp, there is a numeric identifier for a message type. The numbers and the types of message are described below:

#### 1. GPS

* Columns 3, 4, and 5 are longitude (decimal degrees), latitude (decimal degrees) and altitude (metres) respective.
* Columns, 6, 7, and 8 are velocities in the world frame in metres per second (m/s).
* Columns 9 and 10 estimated horizontal and vertical positioning accuracy in metres.

**Example**  
Message: `2020-01-01 12:34:56.001,1,-0.1435435,51.34556,123.24,0.0,0.0,0.0,0.5,0.5`  
Time: 1st January 2020, 12:34:56.001  
Message type: 1 (GPS)  
Longitude: -0.1435435 degrees  
Latitude: 51.34556 degrees  
Altitude: 123.243 metres  
North velocity: 0.0 m/s  
East velocity: 0.0 m/s  
Down velocity: 0.0 m/s  
Estimated horizontal positioning accuracy: 0.5 m  
Estimated vertical positioning accuracy: 0.5 m  

#### 2. IMU (inertial measurement unit)

The fields are accelerations in x, y, z (in units of g) and gyroscope rates
around x, y, z (in deg/s).

**Example**  
Message: `2020-01-01 12:34:56.001,2,-0.018066,0.150879,1.030273,-0.792683,-0.670732,0.060976`  
Time: 1st January 2020, 12:34:56.001  
Message Type: 2 (IMU)  
Acceleration (x): -0.018066 g  
Acceleration (y): 0.150879 g  
Acceleration (z): 1.030273 g  
Gyroscope (x): -0.792683 deg/s  
Gyroscope (y): -0.670732 deg/s  
Gyroscope (z): 0.060976 deg/s  

#### 3. AHRS (altitude and heading reference system)

Produced by the AHRS (altitude and heading reference system). The data is a quaternion in the format w, x, y, z, where w is the scalar rotational quantity and x, y and z represents a unit length vector of the quaternion that transforms the the board frame into the world (north-east-down - NED) frame.

**Example**  
Message: `2020-01-01 12:34:56.001,3,0.951578,0.057938,0.023379,0.300992`  
Time: 1st January 2020, 12:34:56.001  
Message Type: 3 (AHRS)  
w: 0.951578  
x: 0.057938  
y: 0.023379  
z: 0.300992  

#### 4. Atmospheric data (temperature, pressure and humidity sensors)

Produced from the atmospheric / ambient sensors, including the ambient temperature, humidity and barometric pressure sensors.

**Example**  
Message: `2020-01-01 12:34:56.001,4,102.02,24.15,58`  
Time: 1st January 2020, 12:34:56.001  
Message Type: 4 (Atmospheric)  
Pressure: 102.02 kPa  
Temperature: 24.15 degrees C  
Humidity: 58 %RH