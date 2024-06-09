CREATE TABLE positive_energy_district_v2 AS SELECT * FROM positive_energy_district;
DROP TABLE positive_energy_district;
ALTER TABLE positive_energy_district_v2 RENAME TO positive_energy_district;