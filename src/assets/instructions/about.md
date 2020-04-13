# About Vertigo2

Vertigo2 is a compact and highly capable datalogging device. Its variety of sensors allows users to employ the device in a wide variety of engineering, sports and science experiments.

## Sensors

Vertigo is equipped with the following sensors:
* Inertial measurement unit (IMU)
  * 3-axis accelerometer (200 Hz output rate)
  * 3-axis rate gyroscope (200 Hz output rate)
* Global navigation satellite system (GNSS) (10 Hz position output rate)
* Ambient temperature sensor (10 Hz output rate)
* Ambient humidity sensor (10 Hz output rate)
* Ambient barometric pressure sensor (200 Hz output rate)

## Battery

Vertigo2 contains an 850mAh lithium ion (Li-ion) battery safely enclosed in the protective casing. The electronics inside Vertigo ensure that the battery cannot be under-discharged or overcharged.

You should not disassemble Vertigo. Improper handling of Lithium Ion batteries can be dangerous.

## SD card

Vertigo logs data to a microSD card which is inserted into a slot in the side of the casing. The file format is completely open and is described later in the instructions. If a GPS fix is active (green light showing solid), the log files are named according to the date and time when logging begins. Otherwise, they are simply numbered incrementally.

## LEDs

Vertigo contains three LEDs of varying colours to display status information to the user.

* Orange (Log) - this LED illuminates solidly when datalogging is in progress.
* Green (GPS) - this LED flashes slowly when searching for a GPS fix; it lights solidly when a fix is active.
* Blue (Bluetooth) - this LED illuminates solidly when a Bluetooth connection to an external device is active.

![Vertigo LEDs](/assets/img/led-annotations.PNG)

## Bluetooth

Vertigo2 is Bluetooth capable. This means that an external device, such as a laptop computer, tablet or smartphone, can be used to remotely control datalogging, and to view live data from the sensors. This means you can embed Vertigo in an experiment, use the live sensor data to check that everything is ready, and then remotely start datalogging.

It is not necessary for Vertigo to remain connected to the external device during datalogging. If Vertigo becomes disconnected from your device, you can simply reconnect and pick up where you left off.

It is also possible to mix the source of datalogging control. For example, you could start datalogging over Bluetooth, but then stop datalogging using the physical button on the device.