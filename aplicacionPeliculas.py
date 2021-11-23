import tkinter.ttk
from tkinter import *
import mysql.connector
from mibase import *
from PIL import ImageTk, Image
from tkinter import messagebox


miRaiz = Tk()
miRaiz.title("TOP PELICULAS IMDB")
miRaiz.iconbitmap("3d_movies_folder_20527.ico")
miFrame = Frame(miRaiz)
miFrame.pack()
miRaiz.resizable(width=False, height=False)

imagenfondo = ImageTk.PhotoImage(Image.open("fondoAplicacion.gif").resize((500,400)))
labelfondo = Label(miFrame,image=imagenfondo)
labelfondo.grid(row=0,column=0,rowspan = 5,columnspan= 4)




posicionvar= StringVar()
titulovar= StringVar()
aniovar= StringVar()
valvar= StringVar()


def peli_por_posicion():

    mivar= posicionvar.get()
    prueba = posicion_peli(mivar)

    try:
        titulovar.set(prueba[0])
        aniovar.set(prueba[1])
        valvar.set(prueba[2])
    except TypeError:
        messagebox.showerror(message="No se ha encontrado ninguna pelicula", title="Título en la posición "+ mivar)



def peli_por_anio():


    obtenerAnio= anio_peli(aniovar.get())


    if int(aniovar.get()) < 2022 and int(aniovar.get()) > 1919:

        ventanaSecundaria = Toplevel()
        ventanaSecundaria.title("Pelicula en ese año")
        ventanaSecundaria.resizable(False,False)

        tablanueva = tkinter.ttk.Treeview(ventanaSecundaria, columns=('#0', '#1', '#2', '#3'))
        tablanueva.grid(row=0, column=0)

        scrolluno = Scrollbar(ventanaSecundaria, command= tablanueva.yview)
        scrolluno.grid(row=0, column=4, sticky="nsew")
        tablanueva.config(yscrollcommand= scrolluno.set)

        scrolldos = Scrollbar(ventanaSecundaria, command=tablanueva.xview, orient= HORIZONTAL)
        scrolldos.grid(row=1, column=0,sticky="we")
        tablanueva.config(xscrollcommand=scrolldos.set)


        tablanueva.heading("#0", text="Posición")
        tablanueva.heading("#1", text="Título")
        tablanueva.heading("#2", text="Valoración")
        tablanueva.heading("#3", text="Sinopsis")


        tablanueva.tag_configure('fuente', font=("Arial", 12, "bold"))

        tablanueva.column('#0', anchor="center")
        tablanueva.column('#1', anchor="center")
        tablanueva.column('#2', anchor="center")
        tablanueva.column('#3', width=500)
        tablanueva.column('#4', width= 0)


        for i in range(len(obtenerAnio)):
            tablanueva.insert('', 0, tags='fuente', text=obtenerAnio[i][0],
                              values=(obtenerAnio[i][1], obtenerAnio[i][2], obtenerAnio[i][3]))
            tablanueva.insert('', 1, text="")


    else:
        messagebox.showerror(message="No se ha encontrado ninguna pelicula", title="Película de "+aniovar.get())


def insertar_pelicula():

    try:
        peli_insert(posicionvar.get(),titulovar.get(),aniovar.get(),valvar.get())
        messagebox.showinfo(message="La película se ha insertado con éxito", title="Pelicula Insertada")
    except mysql.connector.errors.IntegrityError:
        messagebox.showerror(message="Introduce los datos correctamente", title="ERROR")
    except mysql.connector.errors.DataError:
        messagebox.showerror(message="Introduce los datos correctamente", title="ERROR")


def peli_por_titulo():

    varpeli= titulovar.get()

    try:
        obtenertitulo= titulo_peli(varpeli)

        posicionvar.set(obtenertitulo[0])
        aniovar.set(obtenertitulo[1])
        valvar.set(obtenertitulo[2])

    except:
        messagebox.showerror(message="No se ha encontrado ninguna película", title="ERROR")



def menu_mostrar():

    devuelve = mostrar_datos()
    print(devuelve)



#-----------------------------------MENÚ--------------------------------

barraMenu= Menu(miRaiz)
miRaiz.config(menu=barraMenu)

archivoMenu= Menu(barraMenu,tearoff= 0)
barraMenu.add_cascade(label="Archivo", menu=archivoMenu)

archivoMenu.add_command(label="Mostrar Películas", command= menu_mostrar)
archivoMenu.add_separator()
archivoMenu.add_command(label= "Borrar Películas")





#--------------------------LABELS-----------------------------------------

labelPosicion = Label(miFrame,text="POSICIÓN :")
labelPosicion.grid(row=0, column=0)
labelPosicion.config(pady=20,height=0,bg="black",fg="orange",font=("Courier", 12, "bold"))

labelTitulo = Label(miFrame,text="TÍTULO :")
labelTitulo.grid(row=1, column=0)
labelTitulo.config(pady=20,bg="black",fg="orange",font=("Courier", 12, "bold"))

labelAnio = Label(miFrame,text="AÑO :")
labelAnio.grid(row=2, column=0)
labelAnio.config(pady=20,bg="black",fg="orange",font=("Courier", 12, "bold"))

labelVal = Label(miFrame,text="VALORACIÓN:")
labelVal.grid(row=3, column=0)
labelVal.config(pady=20,bg="black",fg="orange",font=("Courier", 12, "bold"))


#-----------------------------ENTRYS-----------------------------------

entryPosicion= Entry(miFrame,textvariable= posicionvar)
entryPosicion.grid(row=0, column=1, columnspan=2)


entryTitulo= Entry(miFrame,textvariable= titulovar)
entryTitulo.grid(row=1, column=1, columnspan=2)

entryAnio= Entry(miFrame, textvariable= aniovar)
entryAnio.grid(row=2, column=1, columnspan=2)

entryVal= Entry(miFrame, textvariable= valvar)
entryVal.grid(row=3, column=1, columnspan=2)


#------------------------------BOTONES------------------------------------------


botonPosicion= Button(miFrame,text="OK", width=5, command= peli_por_posicion)
botonPosicion.grid(row=0, column= 3,padx=10)

botonTitulo= Button(miFrame,text="OK", width=5, command=peli_por_titulo)
botonTitulo.grid(row=1, column= 3,padx=10)


botonAnio= Button(miFrame,text="OK", width=5, command= peli_por_anio)
botonAnio.grid(row=2, column= 3,padx=10)


botonVal= Button(miFrame,text="OK", width=5)
botonVal.grid(row=3, column= 3,padx=10)

botonInsertar= Button(miFrame, text="Insertar Pelicula",command= insertar_pelicula)
botonInsertar.grid(row=4, column=1,columnspan=2,padx=10,pady=10)

miRaiz.mainloop()


