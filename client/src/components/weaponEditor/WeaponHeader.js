import { React, useEffect, useState } from 'react';

//utilities
import { makeStyles, useTheme } from '@material-ui/core/styles';

//components
import { Typography, Tooltip, IconButton } from '@material-ui/core'

//icons
import { Close, Autorenew, LockOpen, Lock, Favorite, FavoriteBorder } from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    "@global": {
        "@keyframes spin": {
            "0%": {
                transform: "rotate(-360deg)"
            },
            "100%": {
                transform: "rotate(0deg)"
            }
        }
    },

    header: {
        width: "auto",
        display: "flex",
        marginTop: "15px",
        flexWrap: "wrap",
    },

    headerButton: {
        marginLeft: theme.spacing(.25),
    },

    loading: {
        animation: "spin 4s linear infinite",
    }

}))

function WeaponHeader(props) {
    const classes = useStyles();
    const theme = useTheme();

    const equippedSkinData = props.equippedSkinData;
    const inventoryData = props.inventoryData;

    const saving = props.saving;
    const saveCallback = props.saveCallback;

    const favorite = props.isFavorite
    const favoriteCallback = props.favoriteCallback;
    
    const locked = props.isLocked
    const lockCallback = props.lockCallback;

    return (
        <div className={classes.header}>
            <div style={{ width: "auto", alignSelf: "center" }}>
                {equippedSkinData.content_tier.dev_name !== "Standard" ? 
                <img alt={equippedSkinData.content_tier.dev_name} src={equippedSkinData.content_tier.display_icon} style={{ width: "auto", height: "40px", justifySelf: "center", marginRight: "10px" }} />
                : null}
            </div>

            <div>
                <Typography variant="h5">
                    {equippedSkinData.display_name}
                </Typography>
                <Typography variant="overline">
                    {equippedSkinData.content_tier.dev_name !== "Battlepass" ? equippedSkinData.content_tier.dev_name : "Unlockable"} {inventoryData.display_name}
                </Typography>
            </div>

            <div style={{ flexGrow: 1, display: "flex", height: "100%", justifyContent: "flex-end" }}>

                <Tooltip title={locked ? "Unlock weapon from randomization" : "Lock weapon from randomization"} className={classes.headerButton}>
                    <IconButton onClick={lockCallback} style={{ height: "40px", width: "40px" }}>
                        {locked ? <Lock /> : <LockOpen />}
                    </IconButton>
                </Tooltip>


                <Tooltip title={favorite ? "Remove skin from favorites" : "Add skin to favorites"} className={classes.headerButton}>
                    <IconButton onClick={favoriteCallback} style={{ height: "40px", width: "40px" }}>
                        {favorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Tooltip>


                <Tooltip title="Save" className={classes.headerButton}>
                    <IconButton onClick={saveCallback} style={{ height: "40px", width: "40px" }}>
                        {saving ? <Autorenew className={classes.loading} /> : <Close />}
                    </IconButton>
                </Tooltip>
            </div>

        </div>
    )
}

export default WeaponHeader;