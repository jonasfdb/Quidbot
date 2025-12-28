import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';

export class Guild extends Model<InferAttributes<Guild>, InferCreationAttributes<Guild>> {
  declare ULID: string;
  declare dGuildID: string;
  declare allowUnverifiedQuestions: boolean;
  declare allowedFlagsBitmask: number;
  declare guildTimezoneIdentifier: string;
  declare guildObservesDaylightSavings: boolean;
  declare questionSentAtTimezone: string | null;
  declare questionSentAtLocalHour: number;
  declare questionLastSentAt: string | null;
  declare questionNextScheduledAt: string | null;
  declare questionChannelID: string | null;
}

export function initGuildModel(sequelize: Sequelize) {
  Guild.init(
    {
      ULID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dGuildID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      allowUnverifiedQuestions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      allowedFlagsBitmask: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      guildTimezoneIdentifier: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0'
      },
      guildObservesDaylightSavings: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      questionSentAtTimezone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      questionSentAtLocalHour: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      questionLastSentAt: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      questionNextScheduledAt: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      questionChannelID: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }
    },
    // perhaps subscribe to question tags?
    {
      sequelize,
      modelName: 'Guild',
      tableName: 'guild',
      timestamps: false,
    }
  );
}