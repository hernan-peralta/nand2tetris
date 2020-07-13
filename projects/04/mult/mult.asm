// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

@R1			//defino n como R1
D=M
@n
M=D

@R2			//inicializo el producto a cero, sino el test da error
M=0

@i			//defino i y lo pongo como 0, va a ser el contador de 0 hasta R1
M=1

(LOOP)
@i
D=M
@n
D=D-M
@END
D;JGT		//si i-n<0 no es true entonces se termina el loop

@R2
D=M
@R0		
D=D+M		//realizo la suma
@i			//incremento i en 1
M=M+1
@R2			//agrego el valor de D a R2
M=D
@LOOP
0;JMP

(END)
@END
0;JMP

//pseudocode:
//n=R1
//i=0
//while i-n<0
//	R2=R2+R0
