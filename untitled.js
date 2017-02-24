   <TouchableOpacity
            style={VenueStyles.selection}
            onPress={this.onChangeStage.bind(this, item)}>
            <Text style={styles.textMed}>{item}</Text>
            <Text style={VenueStyles.textSm}>
              {getArtist(item, this.state.selectedDay)}
            </Text>
          </TouchableOpacity>


   			<button
            onClick={this.onChangeStage.bind(this, item)}>
            <div>{item}</div>
            <div>
              {getArtist(item, this.state.selectedDay)}
            </div>
          </button>


					 <ScheduleRow 
                      key={key}
                      name={item.name} 
                      startTime = {item.starttime}
                      endTime = {item.endtime}
                      geofence={item.geofence}
                      day={item.day}>
                    </ScheduleRow>