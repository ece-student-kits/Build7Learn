# 16x2 I2C_LCD Display

[Docs](https://www.micropeta.com/video61)

![Image](..\Images\LCD\1.png)

In this section of the tutorial, We connect the display with STM32 by using only 4 wires (Vcc, Ground, SDA and SCL) through I2C module.

### Why using I2C module along with LCD Display ?

![Image](..\Images\LCD\2.png)

- The LCD module consists of 16×2 character cells (2 rows x 16 columns), each cell of which is 5×8 dots. 
- Controlling all of these individual dots is a tedious task for our STM32 microcontroller. 
- So, we use I2C module to simplify this process, it eliminates the need to use the 16 pins by replacing with 4 pins and also allowing to use multiple LCD displays easily.

### Change I2C LCD Address

![Image](..\Images\LCD\3.png)

- The I2C LCD interface (PCF8574) has 3 solder pads on the module’s board which control the value of the last 3 digits in the 7-Bit address of the device (A0 – A1 – A2). 
- The pins are by default (internally) pulled up to HIGH (1), but if we short the solder pads together, this will drive the corresponding address bit pin to LOW (0). And that’s how we can change the device address.

### STM32 I2C LCD Interfacing

![Image](..\Images\LCD\4.jpg)

**GND** is the ground pin.

**Vcc** is the LCD’s power supply input pin (connects to +5v).

**SDA** is the serial data line for the I2C LCD interface.

**SCL** is the serial clock line for the I2C LCD interface.