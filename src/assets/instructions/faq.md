### VertigoIMU Frequently Asked Questions

#### Powering Vertigo

##### How long does Vertigo take to charge? ####

Vertigot takes around 8 hours to fully charge a depleted battery. You is safe to leave Vertigo charging overnight - it will automatically stop charging once the battery is full.

##### How long does Vertigo run from its battery? ###

Using the supplied battery, expect run time of around 5-6 hours. For this reason, it's best to power down Vertigo when you're not using it.

#### Using Vertigo

##### Which SD card should I use with Vertigo? ###

It is best to use the supplied SD card. If you want a spare, make sure that it is no larger than 32GB, is class 10 or better, and is FAT32 or exFAT formatted.

##### Do I have to use the GPS? ###

No, absolutely not. You can start logging before the GPS has gained GPS lock, or if it isn't expected to be able to get GPS lock at all (if inside). Just begin data logging ignore the GPS readings in the log file (they will be all zero). However, getting GPS lock also has an additional benefit, it means that Vertigo knows what the time is and will be able to mark all logs with the correct timestamp.

##### How long does Vertigo take to get a GPS lock? ###

Providing the GPS antenna has a clear view of the sky, Vertigo should acquire a GPS lock within 60 seconds.

##### How many log files can I create on the SD card? ###

A maximum of 256 log files are supported (from `vtg_log0.csv` to `vtg_log255.csv`). If this is exceeded, the oldest will be overwritten first.

#### Common Problems 

##### When I try to begin datalogging by pressing the button, nothing happens. #####

Make sure an appropriately formatted SD card has been inserted - Vertigo cannot begin datalogging with no SD card present.

##### There is an SD card inserted but I still cannot make Vertigo start datalogging.

It is required to keep the log button pressed for a short duration to start datalogging - try holding it down for half a second or so.