
from misPeliculas import *
import mysql.connector


prueba=[]


def conexion_bbdd():

    global miCursor
    global miConexion

    miConexion= mysql.connector.connect(host='localhost',
                                        port='3306',
                                        database='peliculas',
                                         user='root',
                                         password='1234')


    miCursor= miConexion.cursor()




def crear_tabla():

    try:
        miCursor.execute("""
                     CREATE TABLE PELICULAS(
                    id int(10) auto_increment not null,
                    posicion int(10),
                    titulo varchar(100),
                    anio int(4),
                    valoraciones float,
                    sinopsis varchar(400),
                    imagenes varchar(200),
                    constraint id_pelicula primary key (id),
                    constraint pos unique (posicion)
                );"""
                     )

        miConexion.commit()

    except mysql.connector.errors.ProgrammingError:
        print("La tabla ya está creada")


def insertar_valores():
    conexion_bbdd()
    obtener_todas_url()
    cargar_url()
    sqlInsert = (
        "INSERT INTO PELICULAS (posicion,titulo,anio,valoraciones,sinopsis,imagenes) VALUES(%s,%s,%s,%s,%s,%s)")



    for i in range (len(posiciones)):
        valorInsert= [posiciones[i],titulos[i],anio[i],valoraciones[i],sinopsis[i],imagenes[i]]
        miCursor.executemany(sqlInsert,(valorInsert,))
        miConexion.commit()



def posicion_peli(posicionvar):


    conexion_bbdd()

    miCursor.execute("SELECT titulo,anio,valoraciones FROM peliculas WHERE posicion="+str(posicionvar))

    prueba = miCursor.fetchone()
    miConexion.commit()

    return prueba



def anio_peli(aniovar):
    conexion_bbdd()

    miCursor.execute("SELECT posicion,titulo,valoraciones,sinopsis FROM peliculas WHERE anio=" + str(aniovar))

    obtenerAnio = miCursor.fetchall()
    miConexion.commit()

    return obtenerAnio



def peli_insert(posicionvar,titulovar,aniovar,valvar):

    conexion_bbdd()


    sql = "INSERT INTO PELICULAS (posicion,titulo,anio,valoraciones) VALUES(%s,%s,%s,%s)"
    val = [(posicionvar, titulovar, aniovar, valvar)]

    miCursor.executemany(sql, val)
    miConexion.commit()

    print("Pelicula insertada")



def titulo_peli(varpeli):

    conexion_bbdd()

    try:
        miCursor.execute("SELECT posicion,anio,valoraciones FROM peliculas WHERE titulo like '%"+str(varpeli)+"%'")

        obtenertitulo= miCursor.fetchone()
        miConexion.commit()

        return obtenertitulo

    except TypeError:
        print("Pelicula no encontrada")


def mostrar_datos():

    conexion_bbdd()

    miCursor.execute("SELECT posicion, titulo, anio, valoraciones, sinopsis FROM peliculas")
    muestra= miCursor.fetchall()
    miConexion.commit()

    return muestra



def val_peli(valoracion):

    conexion_bbdd()

    miCursor.execute("SELECT posicion,titulo,anio,valoraciones,sinopsis FROM peliculas WHERE valoraciones >="+str(valoracion))
    val= miCursor.fetchall()
    miConexion.commit()

    return val



def borrar_datos():

    conexion_bbdd()
    miCursor.execute("DELETE FROM peliculas")
    miCursor.fetchall()
    miConexion.commit()



