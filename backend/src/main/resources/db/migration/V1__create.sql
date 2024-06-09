CREATE TABLE annual_report
  (
     id                         INTEGER NOT NULL,
     assigned_year              INTEGER NOT NULL,
     energy_source_factors_json CLOB,
     fet_source_factors_json    CLOB,
     kpis_json                  CLOB,
     ped_id                     INTEGER NOT NULL,
     res_sources_json           CLOB,
     status                     TINYINT,
     PRIMARY KEY (id)
  );

CREATE TABLE indicator_task
  (
     id                    INTEGER NOT NULL,
     actual_budget         FLOAT(53),
     actual_energy_saved   FLOAT(53),
     created_at            TIMESTAMP(6) WITH time zone NOT NULL,
     deadline              DATE NOT NULL,
     energy_saved_unit     TINYINT,
     expected_energy_saved FLOAT(53),
     indicator_id          INTEGER NOT NULL,
     NAME                  VARCHAR(255),
     planned_budget        FLOAT(53) NOT NULL,
     status                TINYINT NOT NULL,
     PRIMARY KEY (id)
  );

CREATE TABLE indicator_value
  (
     id               INTEGER NOT NULL,
     amount           FLOAT(53) NOT NULL,
     created_at       DATE,
     creation_year    INTEGER,
     data_source_code VARCHAR(255),
     indicator_id     INTEGER NOT NULL,
     PRIMARY KEY (id)
  );

CREATE TABLE positive_energy_district
  (
     id                                               INTEGER NOT NULL,
     avg_household_income                             FLOAT(53) NOT NULL,
     baseline_year                                    INTEGER NOT NULL,
     build_up_area_size                               FLOAT(53) NOT NULL,
     cooling_degree_days                              INTEGER,
     country_code                                     VARCHAR(150),
     created_at                                       TIMESTAMP(6) WITH time zone,
     description                                      VARCHAR(255),
     focus_district_population                        BIGINT NOT NULL,
     focus_district_size                              FLOAT(53) NOT NULL,
     ghg_emissions_total_in_baseline                  FLOAT(53) NOT NULL,
     heating_degree_days                              INTEGER,
     internal_success_rate                            FLOAT(53),
     money_spent                                      FLOAT(53),
     NAME                                             VARCHAR(150),
     people_reached                                   BIGINT,
     percent_self_supply_renewable_energy_in_baseline FLOAT(53) NOT NULL,
     return_of_investment                             FLOAT(53),
     target_year                                      INTEGER NOT NULL,
     PRIMARY KEY (id)
  );

CREATE TABLE sustainability_indicator
  (
     id                    INTEGER NOT NULL,
     category              VARCHAR(255),
     code                  VARCHAR(255),
     created_at            TIMESTAMP(6) WITH time zone,
     definition_status     TINYINT NOT NULL,
     parent_indicator_code VARCHAR(255),
     ped_id                INTEGER NOT NULL,
     total_value           FLOAT(53),
     unit                  VARCHAR(255),
     PRIMARY KEY (id)
  );

CREATE INDEX annualreport_pedid_idx
  ON annual_report (ped_id);

CREATE INDEX task_indicatorid_idx
  ON indicator_task (indicator_id);

CREATE INDEX value_indicatorid_idx
  ON indicator_value (indicator_id);

CREATE SEQUENCE ANNUAL_REPORT_SEQ START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE INDICATOR_TASK_SEQ START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE INDICATOR_VALUE_SEQ START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE POSITIVE_ENERGY_DISTRICT_SEQ START WITH 1 INCREMENT BY 50;
CREATE SEQUENCE SUSTAINABILITY_INDICATOR_SEQ START WITH 1 INCREMENT BY 50;