<template>
	<div>
		<button @click="captureImage()">拍照</button>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {

			}
		},
		methods: {
				captureImage() {
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				console.log("Resolution: " + res + ", Format: " + fmt);
				cmr.captureImage(function(path) {
						alert("Capture image success: " + path);
					},
					function(error) {
						alert("Capture image failed: " + error.message);
					}, {
						resolution: res,
						format: fmt
					}
				);
			}
		},
		created() {
			// 扩展API加载完毕后调用onPlusReady回调函数 
			document.addEventListener("plusready", onPlusReady, false);
			// 扩展API加载完毕，现在可以正常调用扩展API 
			function onPlusReady() {
				console.log("plusready");
			}
		}
	}

</script>