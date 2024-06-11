# smartmirror
The smartmirror developed by the Ujima S&P Lab at University of California, San Diego is an interactive, public installation that is meant to inform the users about biases within facial recognition & racial determination algorithms. 

## Materials
* **Raspberry Pi 4** to run the algorithms on.
* **Raspberry Pi 4 camera** to take in visual data.
* **Computer monitor** to project the screen that the user will interact iwth.
* **2-way glass mirror** over the monitor to provide a semi-reflective surface.
* **Infrared frame** for touch detection.

## Admin Instructions
1. Connect the monitor & Raspberry Pi to your power sources.
2. Run the virtual environment by typing ``source smart_mirror/bin/activate``.
3. Navigate to the ``smartmirror`` folder.
4. Navigate to the ``app`` folder within ``smartmirror``.
5. Run the app by typing ``python app.py``.
6. Open the website that the app is hosted on in order to view the program.

## Repository Information
![image](https://github.com/clairemallela/smartmirror/assets/171388108/903f21ea-cfc0-466a-b456-159d3f95e774)

``app`` folder 

* Contains all the files required for the app to run (connects front-end & back-end).

``front-end`` folder

* Contains all the HTML & CSS files for the mirror front-end interface.

``html`` folder

* HTML file template that currently works with ``app.py``.

``model`` folder

* Contains the facial recognition & racial detection algorithm that the smartmirror will utilize in back-end. The model should be contained in ``model.py``. 

``static`` folder

## TO-DO
- [ ] ``app.py`` should route to ``front-end`` instead of ``html``.

* Use the ``index.html`` template in the ``html`` folder as reference for transferring the ``front-end`` files to ``app.py``. 

- [ ] Update ''model.py'' in the 'model' folder to the model currently hosted on the Raspberry Pi.

* The current model can be found on the Raspberry Pi. Follow steps 1-3 in **Admin Instructions**, then navigate to the Smart_Mirror_Code file. The file named ``filename`` should be the model that needs to be transferred to ``model.py``.

- [ ] 
