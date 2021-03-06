import { React, useEffect, useState } from 'react';

//utilities
import { makeStyles, useTheme } from '@material-ui/core/styles';

//components
import { Typography, Backdrop, Paper, Grid, Container, Divider, IconButton, Tooltip, Button, Fade } from '@material-ui/core';
import Icon from '@mdi/react'
import WeaponSelectDialog from "../weaponSelect/WeaponSelectDialog.js";

//icons
import { FavoriteBorder, StarBorder, Star, Lock, LockOpen, Close, Autorenew } from '@material-ui/icons';
import { mdiNumeric1Box, mdiNumeric2Box, mdiNumeric3Box, mdiNumeric4Box, mdiNumeric5Box, mdiNumeric6Box, mdiNumeric7Box, mdiNumeric8Box, mdiNumeric9Box } from '@mdi/js';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({

    backdrop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    mainPaper: {
        margin: "auto",
        width: "100%",
        height: "auto",
        maxHeight: "600px",
        minWidth: "400px",
        maxWidth: "600px",

        display: "flex",
        justifySelf: "flex-start",
        justifyContent: "center",
        alignContent: "flex-start",
        flexWrap: "wrap",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            width: 4,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            outline: `1px solid slategrey`,
            backgroundClip: "padding-box",
        },
    },

    content: {
        height: "auto",
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    headerContent: {
        width: "100%",
        height: "auto",
        marginBottom: "18px",
        display: "flex",
        flexDirection: "row",
    },

    header: {
        height: "60px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    equippedWeapons: {
        height: "30px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    instances: {
        height: "auto",
        width: "95%",
        border: `1px rgba(255,255,255,.2) solid`,
        borderRadius: "5px",
        padding: "10px 10px 10px 10px",
        marginBottom: "10px",
    },

    buddyInstance: {
        height: "auto",
        width: "100%",
    },

    buddyInstanceHeader: {
        width: "100%",
        height: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "10px",
    },

    instanceHeaderButton: {
        width: "40px",
        height: "40px",
        margin: "0px 3px 0px 3px"
    },

    buddyInstanceActions: {
        width: "100%",
        height: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
}))


function BuddyEditor(props) {

    const classes = useStyles();
    const theme = useTheme();

    const numericToIcon = {
        1: mdiNumeric1Box,
        2: mdiNumeric2Box,
        3: mdiNumeric3Box,
        4: mdiNumeric4Box,
        5: mdiNumeric5Box,
        6: mdiNumeric6Box,
        7: mdiNumeric7Box,
        8: mdiNumeric8Box,
        9: mdiNumeric9Box,
    }

    const buddyData = props.data
    const loadout = props.loadout
    console.log(buddyData)

    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(true);

    const [equippedWeaponImages, setEquippedWeaponImages] = useState([]);
    const [equippedInstanceWeapons, setEquippedInstanceWeapons] = useState({});

    useEffect(() => {
        var images = []
        Object.keys(loadout).forEach(key => {
            var weapon = loadout[key]
            if (weapon.buddy_uuid === buddyData.uuid) {
                if (!images.includes(weapon.weapon_killstream_icon)) {
                    images.push(weapon.weapon_killstream_icon)
                }
                setEquippedInstanceWeapons({ ...equippedInstanceWeapons, [weapon.buddy_instance_uuid]: weapon.weapon_name })
            }
        })
        setEquippedWeaponImages(images)
    }, [loadout])

    function save(){
        setOpen(false);
        setTimeout(() => {
            props.saveCallback(null);
        }, 150)
    }

    return (
        <Backdrop open={open} className={classes.backdrop} style={{ zIndex: 4 }}>
            <WeaponSelectDialog />
            <Container maxWidth={"xl"}>
                <Paper className={classes.mainPaper} variant="outlined">

                    {/* 
                    - buddy name
                    - buddy image
                    - buddy instance count

                    - box to show what its equipped on
                    
                    - option to favorite it
                    - option to add "super favorite" or something (always in the randomizer pool, but can only choose (total weapons - weapons w/ locked buddies) buddies)
                        - guarantees at least one instance of the buddy will be equipped

                    - repeatable instance menu thing
                        - option to lock it to specific weapon (dropdown or make a diff modal thats more intuitive?)
                        
                    */}

                    <div className={classes.content}>

                        <div className={classes.headerContent} style={{ backgroundImage: `url('${buddyData.display_icon}')`, backgroundSize: "auto 80%", backgroundRepeat: "no-repeat", backgroundPosition: "94%" }}>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div className={classes.header}>
                                    <Icon path={numericToIcon[buddyData.instance_count]} size={1.1} color="white" style={{ height: "100%", marginRight: "10px", filter: "opacity(0.5)" }} />
                                    <Typography variant="h5">
                                        {buddyData.display_name}
                                    </Typography>
                                </div>

                                <div className={classes.equippedWeapons}>
                                    {equippedWeaponImages.map((image, i) => {
                                        return (
                                            <Fade in>
                                                <img src={image} alt="weapon" style={{ width: "auto", height: "100%", objectFit: "contain", float: "left", filter: "opacity(0.5)", marginRight: "10px", }} />
                                            </Fade>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            <div style={{flexGrow: 1, height: "60px", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                <Tooltip title="Save" className={classes.headerButton}>
                                    <IconButton onClick={save} style={{ height: "40px", width: "40px" }}>
                                        {saving ? <Autorenew className={classes.loading} /> : <Close />}
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>


                        <div className={classes.instances}>
                            {
                                Object.keys(buddyData.instances).map((instance, i) => {
                                    var instanceData = buddyData.instances[instance]
                                    var instanceNum = i + 1;
                                    return (
                                        <div className={classes.buddyInstance} style={{marginTop: (i !== 0 ? "17px" : "0px")}}>
                                            <div className={classes.buddyInstanceHeader}>

                                                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                    <Typography variant="body1" style={{}}>INSTANCE {instanceNum}</Typography>
                                                    <Typography variant="overline" style={{ lineHeight: "1.1", color: "rgba(255,255,255,.45)" }}>{equippedInstanceWeapons[instanceData.uuid] !== undefined ? equippedInstanceWeapons[instanceData.uuid] : "Unequipped"}</Typography>
                                                </div>


                                                <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", }}>

                                                    <Tooltip title={"Lock instance to current weapon"}>
                                                        <IconButton onClick={null} className={classes.instanceHeaderButton}>
                                                            <LockOpen />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Divider orientation="vertical" variant="middle" style={{ height: "90%", margin: "5px" }} />

                                                    <Tooltip title={"Super Favorite (x left)"}>
                                                        <IconButton onClick={null} className={classes.instanceHeaderButton}>
                                                            <StarBorder />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title={"Favorite"}>
                                                        <IconButton onClick={null} className={classes.instanceHeaderButton}>
                                                            <FavoriteBorder />
                                                        </IconButton>
                                                    </Tooltip>

                                                </div>

                                            </div>

                                            <div className={classes.buddyInstanceActions}>
                                                <Grid container spacing={1} style={{ width: "100%" }}>
                                                    <Grid item xs={12}>
                                                        <Button variant="outlined" color="primary" style={{ width: "100%", }}>{equippedInstanceWeapons[instanceData.uuid] !== undefined ? "Unequip" : "Equip"}</Button>
                                                    </Grid>
                                                    {/* <Grid item xs={6}>
                                            <Button variant="outlined" color="primary" style={{ width: "100%", }}>idk what this one does</Button>
                                        </Grid> */}
                                                </Grid>
                                            </div>

                                        </div>
                                    )
                                }
                                )}
                        </div>

                    </div>

                </Paper>
            </Container>
        </Backdrop>
    )
}

export default BuddyEditor