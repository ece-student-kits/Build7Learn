# Code
`Task: To interface I2C LCD with STM32`
### Step 1: Create a STM32 Project "LCD"

---

### Step 2: Clock Configuration

- Leave the Clock in the **Default** configuration 

### Step 3: Pinout & Configuration

![Image](..\Images\LCD\5.png)

#### I2C Mode and Configuration

- Select **Mode** as `I2C`
- In `Parameter Settings` under **Configuration**, Select `I2C Speed Mode` as (Standard/Fast) Mode as per the requirements

### Step 4: Download and copy Header files
Download the two files from the drive link below!
- [liquidcrystal_i2c.c](https://drive.google.com/file/d/1J40nr9WNGJjhAsgiFD7kz4EgtRu8Pa-Y/view?usp=drive_link)
Download and place this file inside `LCD --> Core --> Src`
- [liquidcrystal_i2c.h](https://drive.google.com/file/d/19SjaXcLn0jX2e1655hJJYeDqeLpFMbhz/view?usp=drive_link)
Download and place this file inside `LCD --> Core --> Inc`

![Image](..\Images\Ultrasonic\5.webp)

### Step 5: Code Snippet to 16x2 LCD Display

Paste the following code snippet inside the `/* USER CODE BEGIN Includes */` in `main.c`:

```c
#include "liquidcrystal_i2c.h"
```

Paste the following code snippet inside the `While (1)` in `main.c`:

```c
LCD_Init(2);
LCD_NoCursor();
LCD_Clear();
LCD_SetCursor(0,0);
LCD_Print("HELLO");
LCD_SetCursor(9,1);
LCD_Print("WORLD!");
HAL_Delay(2000);


LCD_Clear();
LCD_SetCursor(0,0);
LCD_Print("Learning STM32 with LCD is fun :-)");

for(int x=0; x<40; x=x+1)
{
LCD_ScrollLeft();  //LCD_ScrollRight();
HAL_Delay(500);
}
```