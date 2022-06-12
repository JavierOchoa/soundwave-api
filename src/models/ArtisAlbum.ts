'use strict'

import {Model} from 'sequelize';


interface ArtistAlbumAttributes {
    idArtist: number;
    nameArtist: string;
    idAlbum: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class ArtistAlbum extends Model<ArtistAlbumAttributes>
        implements ArtistAlbumAttributes{
            idArtist!: number;
            nameArtist!: string;
            idAlbum!: number;
    }
    ArtistAlbum.init({
        idArtist:{
            type: DataTypes.INTEGER,
        },
        nameArtist:{
            type: DataTypes.STRING,
        },
        idAlbum:{
            type: DataTypes.INTEGER,
        },
    }, {sequelize,
        timestamps: false,
        modelName: 'ArtistAlbum'
    });
    return ArtistAlbum;
}