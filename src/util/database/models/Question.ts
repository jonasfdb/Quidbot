import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  declare ULID: string;
  declare token: string;
  declare questionText: string;
  declare tagsBitfield: CreationOptional<number>;
  declare flagsBitfield: CreationOptional<number>;
  declare manuallyVerified: CreationOptional<boolean>;
}

export function initQuestionModel(sequelize: Sequelize) {
  Question.init(
    {
      ULID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'default'
      },
      tagsBitfield: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      flagsBitfield: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      manuallyVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: 'Question',
      tableName: 'question',
      timestamps: false,
    }
  );
}