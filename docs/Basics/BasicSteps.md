## Step 1:
1. Open **STM32 CUBE IDE**.
2. Click **File** → **STM32 Project**.

![Image](..\Images\Steps\1.png)


## Step 2:
1. Click **Board Selector**.
2. In **Commercial Part Number**, enter `NUCLEO-F446RE`.
3. Click on the board once.
4. Click **Next**.

![Image](..\Images\Steps\2.png)

## Step 3:
1. Enter **Project Name**.
2. Click **Next**.
3. Click **Finish**.

![Image](..\Images\Steps\3a.png)

## Step 4:
1. Click **Yes** to the prompt:  
   *"Initialize all peripherals with their default Mode?"*

![Image](..\Images\Steps\5.png)

## Step 5:
1. Initialize the respective peripherals with the necessary parameters and modes as per the requirements of the project.

![Image](..\Images\Steps\6a.png)
![Image](..\Images\Steps\8.png)

## Step 6:
1. Modify the **clock configuration** if required, according to the project requirements.

![Image](..\Images\Steps\9.png)

## Step 7:
1. Click the **Generate Code** icon.

![Image](..\Images\Steps\10.png)

## Step 8:
1. Click **Yes** to the prompt displayed.

![Image](..\Images\Steps\11.png)

## Step 9:
1. The configuration code will be automatically generated as per the parameters set.
2. Add your code and headers in the **User Code Blank Areas Provided**.

![Image](..\Images\Steps\12a.png)

## Step 10:
1. Connect the **Nucleo Board** to the PC.
<!---
[![Image](..\Images\Steps\16c.jpg)]: #
-->
   **Note:**  
   If the error **"No ST LINK Detected"** occurs, adjust the port & wire connection in the board until it is connected properly.

   ![Image](..\Images\Steps\16e1.png)

## Step 11:
1. Save the file (**Ctrl + S**).
2. Click on the **Run** icon.
3. Click **OK** in the **Build Project** window.

![Image](..\Images\Steps\15.png)
![Image](..\Images\Steps\16.png)