---
sidebar_position: 6
title: LCD with I2C and Keypad
---

# LCD with I2C and 4x4 Keypad

This project displays keypad input on LCD screen using I2C communication.

---

![Arduino UNO microcontroller board connected via I2C wiring to a 16x2 LCD display module with green circuit board, showing data and clock signal lines](../image/lcd.jpeg)

![I2C protocol communication diagram illustrating serial data and clock line connections between microcontroller and LCD module](../image/i2c.jpeg)

---
# LCD Display with I2C 
---

## 1. Introduction

LCD (Liquid Crystal Display) is an electronic display module used to show text and symbols.  
In Arduino projects, a 16×2 LCD is commonly used to display messages, sensor values, and system status.

To reduce wiring complexity, an I2C module (PCF8574) is attached to the LCD.  
Using I2C communication, only two Arduino pins are required:

- SDA (Serial Data Line)
- SCL (Serial Clock Line)

This makes the circuit simple and efficient.

---

## 2. Working

1. The Arduino sends data to the LCD using the I2C communication protocol.
2. Data is transferred through SDA and synchronized using SCL.
3. The I2C module converts serial data into parallel form.
4. The LCD controller (HD44780) processes the data.
5. The text is displayed on the LCD screen.

---

## 3. Arduino Code

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2); // Change to 0x3F if needed

void setup() {
  lcd.init(); // Initialize LCD
  lcd.backlight(); // Turn on backlight
  lcd.setCursor(0, 0);
  lcd.print("Hello");
}

void loop() {
}
```
---
![Arduino UNO board with I2C LCD display connected showing complete wiring configuration for keypad input and data display project](../image/lcd_con.png)

---

---
# 4x4 Keypad with Arduino
---

## 1. Introduction

A 4x4 keypad is an input device used to enter numbers, characters, and commands into a system.  
It consists of 16 buttons arranged in 4 rows and 4 columns.

Each key works using a matrix arrangement. When a key is pressed, it connects one row and one column, allowing the Arduino to detect which key is pressed.

Keypads are commonly used in:
- Password systems
- Attendance systems
- Security locks
- Embedded projects

---

## 2. Working

1. The keypad has 4 row pins and 4 column pins.
2. Arduino sends signals to rows one by one.
3. When a key is pressed, it connects a row and column.
4. Arduino detects the column signal.
5. The pressed key is identified and displayed in Serial Monitor.

This method is called matrix scanning.

---

## 3. Arduino Code

```cpp
#include <Keypad.h>

const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(9600);
}

void loop() {
  char key = keypad.getKey();
  
  if (key) {
    Serial.print("Key Pressed: ");
    Serial.println(key);
  }
}
```
---
![Arduino UNO microcontroller connected to 4x4 keypad matrix via ribbon cable with row pins 9, 8, 7, 6 and column pins 5, 4, 3, 2 labeled on breadboard setup](../image/key_con.png)


---
## MECHANISM


![4x4 membrane keypad matrix showing 16 button layout with row and column pin configuration labeled](../image/keypad_pin.jpeg)

![4x4 keypad component with tactile button switches arranged in four rows and four columns](../image/me_keyboard.jpeg)

---

## How It Works

- Keypad detects key press.
- Arduino reads key value.
- LCD displays pressed key.
- '#' confirms input.
- '*' clears input.

---

## Complete Arduino Code

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

const byte ROWS = 4;
const byte COLS = 4;

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String input = "";

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("Enter Number:");
}

void loop() {
  char key = keypad.getKey();

  if (key) {

    if (key == '#') {
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("You Entered:");
      lcd.setCursor(0,1);
      lcd.print(input);
      delay(2000);

      input = "";
      lcd.clear();
      lcd.print("Enter Number:");
    }

    else if (key == '*') {
      input = "";
      lcd.clear();
      lcd.print("Cleared");
      delay(1000);
      lcd.clear();
      lcd.print("Enter Number:");
    }

    else {
      input += key;
      lcd.setCursor(0,1);
      lcd.print(input);
    }
  }
}
```

## Connection

---
![Arduino UNO microcontroller with 4x4 keypad and I2C LCD display fully connected on breadboard, showing all row and column wiring, power connections, and I2C data/clock lines integrated in complete project setup](../image/both_key_lcd.png)

---
