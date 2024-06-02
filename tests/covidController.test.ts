/**
 * Este archivo contiene las pruebas unitarias para el módulo CovidController.
 */

import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { CovidDataModel } from "../repositories/covidRepository";

/**
 * Representa la instancia de MongoMemoryServer utilizada para las pruebas.
 */
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  /**
   * The MongoDB connection URI.
   */
  const uri = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }

  await CovidDataModel.insertMany([
    {
      fecha_aplicaci_n: "2021-02-17T00:00:00.000",
      a_o: "2021",
      cod_territorio: "11",
      nom_territorio: "Bogotá",
      cantidad_dosis_aplicadas: 23456,
      fecha_corte: "2023-02-28T00:00:00.000",
    },
    {
      fecha_aplicaci_n: "2021-02-17T00:00:00.000",
      a_o: "2021",
      cod_territorio: "05",
      nom_territorio: "Antioquia",
      cantidad_dosis_aplicadas: 12345,
      fecha_corte: "2023-02-28T00:00:00.000",
    },
  ]);
});

describe("Covid Data Endpoints", () => {
  it("should update covid data", async () => {
    const res = await request(app).get("/api/update");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Data updated successfully");
  });

  it("should get all covid data", async () => {
    const res = await request(app).get("/api/vacunas");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get covid data by department", async () => {
    const res = await request(app).get("/api/vacunas?departamento=Bogotá");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].departamento).toBe("Bogotá");
  });
});
