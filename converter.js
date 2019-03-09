function pathConverter(targetOS) {
  if (targetOS == 'mac') {
    copyTarget = document.getElementById("convertTargetMac");
  } else {
    copyTarget = document.getElementById("convertTargetWin");
  }

  targetPath = copyTarget.value;

  copyTarget.value = convertPath(targetOS, targetPath);
  if (copyTarget.value !== 'false'){
    copyTarget.select();
    document.execCommand("Copy");
    document.getElementById('message_copy_to_' + targetOS).innerHTML = 'Copied to clipboard!';
  } else {
    copyTarget.value = targetPath;
  }

  function convertToNFC(string){
    return string.normalize('NFC');
  }

  function convertPath(targetOS, filepath){
    if(targetOS == 'win' && filepath.match(/smb:\/\/(.+)/) != null){
      var teplaceText = '';
      var temp = filepath.match(/smb:\/\/(.+)/);

      replaceText = '\\\\' + temp[1].replace(/\//g, '\\');
      document.getElementById('message_convert_to_win').innerHTML = 'Converted!';

      return replaceText;
    } else if (targetOS == 'mac' && filepath.match(/\\\\(.+)/) != null){
      filepath = convertToNFC(filepath);
      replaceText = 'smb:' + filepath.replace(/\\/g, '/');
      document.getElementById('message_convert_to_mac').innerHTML = 'Converted!';

      return replaceText;
    } else {
      document.getElementById('message_convert_to_' + targetOS).innerHTML = 'ERROR...! Please check if the format is correct.';
      document.getElementById('message_copy_to_' + targetOS).innerHTML = '';

      return false;
    }
  }
}
