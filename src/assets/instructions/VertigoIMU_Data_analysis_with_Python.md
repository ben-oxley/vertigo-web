# VertigoIMU: Data analysis with Python  <img style="float: right;" src="python-4.svg"> 
 



 
 [Home](index.md)
 
 


Jupyter notebooks provide a great way of interactively coding in Python and seeing the results in-line. You can have a preview of the results plotted for the greenpower car by having a look at one we made earlier [Jupyter Notebook on Azure](https://notebooks.azure.com/vertigo/libraries/python-dev/html/Plot.ipynb) 

There are few different ways to get started. 
* [Using python online](#online)
* [Run jupyter notebooks on your PC](#download)

## <a name = "online"></a>Online
Sign up for an account with Azure (free) and they will let your run all of this online, on their service. Click this button 
[![Azure Notebooks](https://notebooks.azure.com/launch.png)](https://notebooks.azure.com/vertigo/libraries/python-dev) to get started.
1. Go to the link.
2. Click clone.
3. Once you have a copy, click on Plot.ipynb and then hit run.
4. Follow wait for your server to turn on and configure itself.
5. Using the **Data** menu at the top of the notebook. Data --> Upload. Copy the file link that it returns (e.g. /home/nbuser/vtg_log7_wheel.csv) and put it in the openFile statement on step 2.
6. Using the **Cell** menu at the top of the notebook, click Cell --> Run All. Wait as each processing step completes and graphs appear!

## <a name = "download"></a> Run jupyter notebooks on your PC
Or else, download and run locally:
1. Download anaconda from their website [Anaconda](https://www.anaconda.com/download/)
2. Download [this](https://github.com/SGSVertigo/vertigo-python) repository and go to the folder.
3. From command line, type `conda env create -f environment.yml`. This creates an environment with all of the libraries we need for processing files installed. Next time you come back, you'll want to enter the environment by running `activate pyvertigo` or `source activate pyvertigo`. See the [Anaconda Documentation](https://conda.io/docs/user-guide/tasks/manage-environments.html#activating-an-environment) for more information.
4. Run the notebook server by calling `jupyter notebook`. The default server address will be `http://localhost:8888`. Navigate to this from your web browser and start playing! More information on running the juypter notebook can be found [here](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/execute.html).


