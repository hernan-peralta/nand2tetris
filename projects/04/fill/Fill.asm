// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

@zero
M=0

@8192
D=A
@n
M=D

@i
M=0
@SCREEN
D=A
@addr
M=D


(LOOP)		//loop para "escuchar" al teclado
	@i			//
	M=0			//
	@SCREEN		//seteo i y addr en cero y en el comienzo del valor de memoria asignada a la pantalla respectivamente
	D=A			//
	@addr		//
	M=D			//
		
	@KBD		// de aca para abajo es el loop propiamente dicho para "escuchar" al teclado
	D=M
	@zero
	D=D-M

	@SCREENBLACK
	D;JNE

	@SCREENWHITE
	D;JEQ

	@LOOP
	0;JEQ
	

(SCREENBLACK)		//setea la pantalla en negro
	@i
	D=M
	@8192
	D=D-A
	@LOOP
	D;JEQ
	
	@addr
	A=M	
	M=-1		//RAM[A]=-1 setea los 16 bits del registro RAM[A] en 1111111111... 
	
	@i
	M=M+1
	
	@addr
	M=M+1	
	
	@SCREENBLACK
	0;JMP


(SCREENWHITE)		//setea la pantalla en blanco
	@i
	D=M
	@8192
	D=D-A
	@LOOP
	D;JEQ
	
	@addr
	A=M	
	M=0
	
	@i
	M=M+1
	
	@addr
	M=M+1	
	
	@SCREENWHITE
	0;JMP